from asyncio.windows_events import NULL
import os
import requests
from typing import List
from selenium import webdriver
from selenium.webdriver.chrome.service import Service

session_server_address = NULL

def set_session_server(session_server: str):
    """Set session server address

    Args:
        session_server (str): url of session_server
    """
    global session_server_address
    session_server_address = session_server

def get_session_server() -> str:
    """Get session server address

    Returns:
        str: url of session_server
    """
    global session_server_address
    return session_server_address if session_server_address else os.getenv('SESSION_SERVER') if os.getenv('SESSION_SERVER') else 'http://localhost:3000'

def get_session_cookies(session_server: str, tags: List[str]) -> List[dict]:
    """Get session cookies from server according to list of given tag

    Args:
        session_server (str): url of session_server
        tags (List[str]): list of tags related to session

    Returns:
        List[dict]: list of dictionaries, one dict per cookie
    """
    tags_param = f'?tags={",".join(tags)}' if tags else ''
    url = f'{session_server}/api/session{tags_param}'
    response = requests.get(url)
    return response.json()

def set_session_cookies(driver: webdriver, cookies: List[dict]):
    """Set session cookies according to list of given cookies

    Args:
        driver (webdriver): webdriver of session in which we want to set cookies
        cookies (List[dict]): cookies to be set to session
    """
    cdp_cookies = dict({"cookies": cookies})
    driver.execute_cdp_cmd("Network.setCookies", cdp_cookies)

def init_session(driver: webdriver, tags: List[str]):
    """Initialize session with cookies from server according to list of given tags

    Args:
        driver (webdriver): webdriver of session in which we want to set cookies
        tags (List[str]): tags by which we want to get cookies
    """
    cookies = get_session_cookies(get_session_server(), tags)
    set_session_cookies(driver, cookies)