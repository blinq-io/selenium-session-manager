import os
from time import sleep
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from session_client import init_session

def test():
    driver = webdriver.Chrome('clients/java/chromedriver.exe')
    init_session(driver, ['github'])
    driver.get("https://github.com/")
    sleep(5)
    driver.quit()

test()
