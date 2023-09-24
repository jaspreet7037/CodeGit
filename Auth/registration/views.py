from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login

# Create your views here.
def home(request):
    return render(request, 'index.html')

def signup(request):

    if request.method == 'POST':
        #username = request.POST.get('username')
        username = request.POST['username']
        name = request.POST['name']
        email = request.POST['email']
        pass1 = request.POST['pass1']
        pass2 = request.POST['pass2']

        myuser = User.objects.create_user(username, email, pass1)
        myuser.name = name

        myuser.save()

        messages.success(request, "Your account has been successfully created.")

        return redirect('login')

    return render(request, 'signup.html')

def login(request):

    if request.method == 'POST':
        username = request.POST['username']
        pass1 = request.POST['pass1']

        user = authenticate(username=username, pasword=pass1)

        if user is None:
            login(request, user)
            name = user.name
            return render(request, "authentication/index.html", {'name':name})

        else:
            messages.error(request, "Incorrect Username & Password.")
            

    return render(request, 'login.html')

def logout(request):
    pass