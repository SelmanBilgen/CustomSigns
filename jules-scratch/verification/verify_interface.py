from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:5173/")

    # Add a new line
    page.click(".add-line-btn")

    # Change the color of the second line
    page.locator(".color-cubes").nth(1).locator(".color-cube").nth(2).click()

    # Take a screenshot
    page.screenshot(path="jules-scratch/verification/verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)