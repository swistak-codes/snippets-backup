import pygame, sys, math, datetime
from pygame.locals import QUIT

pygame.init()

size = width, height = 500, 500

screen = pygame.display.set_mode(size)
pygame.display.set_caption('Zegar analogowy')

outer_radius = 250
second_radius = 200
minute_radius = 180
hour_radius = 120

minute_marker_radius = outer_radius - 5
second_minute_marker_radius = minute_marker_radius - 5
hour_marker_radius = (second_radius + second_minute_marker_radius) / 2

center_x = width / 2
center_y = height / 2

white = (255, 255, 255)
black = (0, 0, 0)
red = (255, 0, 0)


def get_position(angle, radius):
    x = radius * math.cos(angle - 0.5 * math.pi) + center_x
    y = radius * math.sin(angle - 0.5 * math.pi) + center_y
    return x, y


def clear():
    screen.fill(white)


def draw_border():
    pygame.draw.circle(screen, (0, 0, 0), (center_x, center_y), outer_radius,
                       1)


def draw_face():
    for i in range(1, 61):
        divisible_by_5 = i % 5 == 0
        angle = (2 * math.pi * i) / 60
        radius = second_minute_marker_radius if divisible_by_5 else minute_marker_radius
        start = get_position(angle, radius)
        end = get_position(angle, outer_radius)

        pygame.draw.line(screen, black, start, end)

        if divisible_by_5:
            hour = str(int(i / 5))
            position = get_position(angle, hour_marker_radius)
            font = pygame.font.SysFont(None, 32)
            text = font.render(hour, False, black)
            text_position = text.get_rect(center=position)
            screen.blit(text, text_position)


def draw_hand(angle, color, radius):
    position = get_position(angle, radius)
    pygame.draw.line(screen, color, (center_x, center_y), position)


def draw_hours_hand(hours, minutes):
    time = hours + minutes / 60
    angle = 2 * math.pi * time / 12
    draw_hand(angle, black, hour_radius)


def draw_minutes_hand(minutes, seconds):
    time = minutes + seconds / 60
    angle = 2 * math.pi * time / 60
    draw_hand(angle, black, minute_radius)


def draw_seconds_hand(seconds, milliseconds):
    time = seconds + milliseconds / 1000
    angle = 2 * math.pi * time / 60
    draw_hand(angle, red, second_radius)


def draw():
    current_time = datetime.datetime.now()
    hours = current_time.hour % 12
    minutes = current_time.minute
    seconds = current_time.second
    milliseconds = math.floor(current_time.microsecond / 1000)

    clear()
    draw_border()
    draw_face()
    draw_hours_hand(hours, minutes)
    draw_minutes_hand(minutes, seconds)
    draw_seconds_hand(seconds, milliseconds)


while True:
    for event in pygame.event.get():
        if event.type == QUIT:
            pygame.quit()
            sys.exit()
    draw()
    pygame.display.update()
