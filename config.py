import os

# default config
class BaseConfig(object):
    # __file__ refers to the file config.py 
    APP_ROOT = os.path.dirname(os.path.abspath(__file__))  # refers to application_top
    APP_TEMP_FILE = os.path.join(APP_ROOT, 'tempfiles')
    
    # session keys
    SECRET_KEY = os.urandom(24)
    # SECRET_KEY = '\xbf\xb0\x11\xb1\xcd\xf9\xba\x8bp\x0c...'

    API_URL = os.environ.get('API_URL')
    MONGODB_HOST = os.environ.get('MONGODB_HOST')
    MONGODB_PORT = os.environ.get('MONGODB_PORT')
    MONGODB_USER = os.environ.get('MONGODB_USER')
    MONGODB_KEY = os.environ.get('MONGODB_KEY')
    
    AUTH0_CLIENT_ID=os.environ.get('AUTH0_CLIENT_ID') 
    AUTH0_CLIENT_SECRET=os.environ.get('AUTH0_CLIENT_SECRET')
    AUTH0_DOMAIN=os.environ.get('AUTH0_DOMAIN')
    AUTH0_CALLBACK_URL=os.environ.get('AUTH0_CALLBACK_URL')
    
    DEBUG = True
    TESTING = True


class TestConfig(BaseConfig):
    DEBUG = True
    TESTING = True


class DevelopmentConfig(BaseConfig):
    DEBUG = True
    TESTING = False


class ProductionConfig(BaseConfig):
    DEBUG = False
    TESTING = False
