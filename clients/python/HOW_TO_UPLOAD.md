# How to upload updated package to PyPI

## Pre-requisites
pip install twine


## Files to update (after you change your code)
Update version field in setup.cfg

## Build the package
python setup.py sdist

## Upload the package
twine upload dist/*

Enter your PyPi username and password when prompted to do so. 

Alternatively if TWINE_USER and TWINE_PASSWORD environment variables are defined, twine will use them.

It is advised to use API token instead of user/password and in this case the USER should be \_\_token\_\_ and the password is the value of the API token
