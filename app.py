from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, render_template, url_for, request, redirect, send_file
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///acvarium.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.app_context().push()
db = SQLAlchemy(app)


def LoadTemp(arrName, count):
    name = arrName
    flag = False
    query = Purchases.query.all()
    for fish in name:
        for el in query:
            if(el.name == fish):
                count.append(el.count)
                flag = True
        if(not flag):
            count.append(0)
        flag = False
def Change(request):
    query = Purchases.query.all()

    name = request.form.get('name')
    title = request.form.get('title')
    price = request.form.get('price')
    img = request.form.get('img')
    btn = request.form.get('btn')

    flag = False
    for el in query:
        if el.name == name:
            if btn == 'minus':
                if(el.count > 1):
                    el.count = el.count - 1
                else:
                    delQuery = Purchases.query.filter(Purchases.id == el.id).first()
                    db.session.delete(delQuery)
                    db.session.commit()
                flag = True
            if btn == 'plus':
                el.count = el.count + 1
                flag = True
    if (not flag) and (btn == 'plus'):
        purchases = Purchases(name=name, title=title, price=price, img=img, count=1)
        db.session.add(purchases)
    db.session.commit()


class Purchases(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), nullable=False)
    title = db.Column(db.String(256), nullable=False)
    img = db.Column(db.String(256), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    count = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<Purchases %r>' % self.id


@app.route('/')
def Load():
    file = 'instance/acvarium.db'
    try:
        os.remove(file)
    except:
        pass
    db.create_all()
    return render_template('index.html')

@app.route('/home', methods=['POST', 'GET'])
def Home():
    if request.method == 'GET':
        count = []
        LoadTemp(['Апоногетон ульвацеус','Микрорасбора галактика Москва', 'Данио салатовый', 'Барбус алый (Puntius ticto)'], count)
        return render_template('home.html', count=count, i=0)
    else:
        Change(request)
        return redirect('/home')

@app.route('/galary', methods=['POST', 'GET'])
def Galary():
    if request.method == 'GET':
        count = []
        LoadTemp(['Молли баллон далматин','Пецилия Микки Маус', 'Карликовая пиранья', 'Боция шахматная', 'Лабео альбинос'], count)
        return render_template('galary.html', count=count, i=0)
    else:
        Change(request)
        return redirect('/galary')

@app.route('/cart', methods=['POST', 'GET'])
def Cart():
    if request.method == 'GET':
        query = Purchases.query.all()
        item = 0
        value = 0
        for el in query:
            item+=el.count
            value+=el.price*el.count

        return render_template('cart.html', purchases=query, item=item, value=value)
    else:
        btn = request.form.get('btn')
        if btn == 'del':
            name = request.form.get('name')
            delQuery = Purchases.query.filter(Purchases.name == name).first()
            db.session.delete(delQuery)
            db.session.commit()
        else:
            Change(request)
        return redirect('/cart')

@app.route('/cardProcessing', methods=['POST', 'GET'])
def cardProcessing():
    Change(request)
    return redirect('/home')

@app.route('/services')
def Services():
    return render_template('services.html')

@app.route('/clear')
def Clear():
    return render_template('clear.html')

if __name__ == '__main__':
    app.run(debug=True)