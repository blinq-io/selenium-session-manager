# How to upload updated package to PyPI

## Pre-requisites
pip install twine


## Files to update (after you change your code)
Update version field in setup.cfg

## Build the package
python setup.py sdist

## Upload the package
twine upload dist/*

Enter your PyPi username and password when prompted to do so
