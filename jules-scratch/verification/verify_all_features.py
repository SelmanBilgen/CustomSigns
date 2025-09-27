from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:5173/")

    # Test collapsible controls panel
    page.click(".toggle-controls-btn")
    page.screenshot(path="jules-scratch/verification/controls-hidden.png")
    page.click(".toggle-controls-btn")

    # Test redesigned controls panel
    page.click(".selected-color")
    page.locator(".color-grid .color-cube").nth(2).click()

    # Test responsive layout
    page.set_viewport_size({"width": 375, "height": 667})
    page.screenshot(path="jules-scratch/verification/responsive-layout.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)