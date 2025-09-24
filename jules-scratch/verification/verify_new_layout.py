from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:5173/")

    # 1. Check initial layout: one line of controls, add button is visible
    page.screenshot(path="jules-scratch/verification/01-initial-layout.png")

    # 2. Click "Add a new line" button
    page.locator(".add-line-btn").click()
    page.screenshot(path="jules-scratch/verification/02-added-line.png")

    # 3. Change color of the second line
    page.locator(".controls-row").nth(1).locator(".color-cube").nth(2).click()
    page.screenshot(path="jules-scratch/verification/03-changed-color.png")

    # 4. Delete the second line
    page.locator(".controls-row").nth(1).locator(".delete-btn").click()
    page.screenshot(path="jules-scratch/verification/04-deleted-line.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)