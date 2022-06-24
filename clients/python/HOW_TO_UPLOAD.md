# How to upload updated package to PyPI

## Files to update (after you change your code)
Update version field in setup.cfg

## Build the package
python setup.py sdist

## Upload the package
pip install selenium_session_client --upgrade