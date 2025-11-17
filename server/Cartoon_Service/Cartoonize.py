# cartoonize.py
from flask import Flask, request, send_file, jsonify
import cv2
import numpy as np
import tempfile
import os

app = Flask(__name__)

def cartoonize_image(img_bgr):
    # Convert to gray and median blur
    gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)
    gray = cv2.medianBlur(gray, 7)

    # Edge detection
    edges = cv2.adaptiveThreshold(gray, 255,
                                  cv2.ADAPTIVE_THRESH_MEAN_C,
                                  cv2.THRESH_BINARY, 9, 9)

    # Color smoothing (bilateral filter)
    color = cv2.bilateralFilter(img_bgr, d=9, sigmaColor=200, sigmaSpace=200)

    # Combine edges & color
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