from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:5173/")

    # Change the background
    page.click(".category-tabs button:nth-child(2)")
    page.click(".background-options .bg-thumbnail:nth-child(2)")

    # Add a new line
    page.click(".add-line-btn")

    # Toggle the ruler
    page.click(".ruler-toggle")

    # Take a screenshot
    page.screenshot(path="jules-scratch/verification/verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)