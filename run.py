from project import app

if __name__ == '__main__':
    # app.run()
    
    # particularly for cloud 9 use
    import os
    app.run(host=os.environ['IP'],port=int(os.environ['PORT']),debug=True)
    