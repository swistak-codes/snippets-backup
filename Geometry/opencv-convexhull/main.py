# lekko zmodyfikowany kod z https://docs.opencv.org/4.x/d7/d1d/tutorial_hull.html
# niestety kod nie działa na Replit, musisz ściągnąć go lokalnie
# i uruchomić po zainstalowaniu opencv-python i numpy przez pip lub poetry

import cv2 as cv
import numpy as np
import random as rand

def display(path):
  src = cv.imread(path)
  src_gray = cv.cvtColor(src, cv.COLOR_BGR2GRAY)
  src_gray = cv.medianBlur(src_gray, 5)

  def thresh_callback(threshold):
    canny_output = cv.Canny(src_gray, threshold, threshold * 2)
    contours, _ = cv.findContours(canny_output, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)
    hull_list = []
    for i in range(len(contours)):
        hull = cv.convexHull(contours[i])
        hull_list.append(hull)
    drawing = np.zeros((canny_output.shape[0], canny_output.shape[1], 3), dtype=np.uint8)
    for i in range(len(contours)):
        color = (rand.randint(0,256), rand.randint(0,256), rand.randint(0,256))
        cv.drawContours(drawing, hull_list, i, color)
    cv.imshow(f'Kontury ({path})', drawing)

  cv.namedWindow(path)
  cv.imshow(path, src)

  thresh = 100
  cv.createTrackbar('Prog:', path, thresh, 255, thresh_callback)
  thresh_callback(thresh)

display('./glowa_swistak.png')
display('./rysunkowy_swistak.png')
cv.waitKey()