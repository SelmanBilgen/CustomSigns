from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:5173/")

    # Enter text into the input fields
    page.locator('input[type="text"]').first.fill("Hello")
    page.locator('input[type="text"]').nth(1).fill("World")

    page.wait_for_timeout(2000)

    # Drag the first line of text
    first_text_locator = page.locator(".canvas-text").first
    first_text_bounding_box = first_text_locator.bounding_box()
    start_x = first_text_bounding_box['x'] + first_text_bounding_box['width'] / 2
    start_y = first_text_bounding_box['y'] + first_text_bounding_box['height'] / 2

    page.mouse.move(start_x, start_y)
    page.mouse.down()
    # Move in a small arc to ensure it's a drag
    page.mouse.move(start_x + 100, start_y + 50, steps=5)
    page.mouse.move(start_x + 150, start_y + 150, steps=5)
    page.mouse.up()

    page.wait_for_timeout(1000)

    # Take a screenshot
    page.screenshot(path="jules-scratch/verification/verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)