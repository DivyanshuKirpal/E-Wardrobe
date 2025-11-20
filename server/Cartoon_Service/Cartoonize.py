# cartoonize.py
from flask import Flask, request, send_file, jsonify
import cv2
import numpy as np
import tempfile
import os

app = Flask(__name__)

def cartoonize_image(img_bgr):
    """
    Enhanced cartoonization with bit emoji style
    Creates a more vibrant, simplified cartoon effect
    """
    # Resize for faster processing if image is too large
    height, width = img_bgr.shape[:2]
    max_dimension = 800
    if max(height, width) > max_dimension:
        scale = max_dimension / max(height, width)
        img_bgr = cv2.resize(img_bgr, None, fx=scale, fy=scale, interpolation=cv2.INTER_AREA)
    
    # Step 1: Edge detection with adaptive threshold
    gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)
    gray = cv2.medianBlur(gray, 7)
    edges = cv2.adaptiveThreshold(gray, 255,
                                  cv2.ADAPTIVE_THRESH_MEAN_C,
                                  cv2.THRESH_BINARY, 9, 9)

    # Step 2: Color quantization for bit emoji effect (reduce colors)
    # Convert to float and divide by 64 to reduce color palette
    data = np.float32(img_bgr).reshape((-1, 3))
    data = data / 64.0  # Reduce to ~4 levels per channel
    data = np.floor(data) * 64  # Quantize
    data = np.clip(data, 0, 255)
    quantized = data.reshape(img_bgr.shape).astype(np.uint8)
    
    # Step 3: Bilateral filter for smoothing while preserving edges
    color = cv2.bilateralFilter(quantized, d=9, sigmaColor=300, sigmaSpace=300)
    
    # Step 4: Enhance saturation for vibrant cartoon look
    hsv = cv2.cvtColor(color, cv2.COLOR_BGR2HSV)
    hsv[:, :, 1] = np.clip(hsv[:, :, 1] * 1.3, 0, 255)  # Increase saturation by 30%
    color = cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)

    # Step 5: Combine edges with color
    edges_color = cv2.cvtColor(edges, cv2.COLOR_GRAY2BGR)
    cartoon = cv2.bitwise_and(color, edges_color)

    return cartoon

@app.route('/cartoonize', methods=['POST'])
def cartoonize():
    if 'image' not in request.files:
        return jsonify({'msg': 'no image file provided'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'msg': 'empty filename'}), 400

    tmp_in = tempfile.NamedTemporaryFile(delete=False, suffix=".png")
    tmp_out = tmp_in.name + ".cartoon.png"
    try:
        file.save(tmp_in.name)
        img = cv2.imread(tmp_in.name)
        if img is None:
            return jsonify({'msg': 'could not read image'}), 400

        out = cartoonize_image(img)
        cv2.imwrite(tmp_out, out)

        return send_file(tmp_out, mimetype='image/png')
    finally:
        # Clean up input file immediately. Output will be sent; you may choose to unlink after send.
        try:
            if os.path.exists(tmp_in.name):
                os.unlink(tmp_in.name)
        except:
            pass

if __name__ == '__main__':
    # listens on port 6000 by default
    app.run(host='0.0.0.0', port=6000, debug=False)