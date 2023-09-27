from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout

# Create your views here.
def home(request):
    return render(request, 'home.html')

def signup(request):

    if request.method == 'POST':
        #username = request.POST.get('username')
        username = request.POST['username']
        fname = request.POST['fname']
        email = request.POST['email']
        pass1 = request.POST['pass1']
        pass2 = request.POST['pass2']

        if pass1!=pass2:
            return HttpResponse("Your password are not same.")

        myuser = User.objects.create_user(username, email, pass1)
        myuser.first_name = fname

        myuser.save()

        messages.success(request, "Your account has been successfully created.")

        return redirect('signin')

    return render(request, 'signup.html')

def signin(request):

    if request.method == 'POST':
        username = request.POST['username']
        pass1 = request.POST['pass1']

        user = authenticate(request, username=username, password=pass1)

        if user is not None:
            login(request, user)
            fname = user.first_name
            return render(request, "index.html", {'fname':fname})

        else:
            messages.error(request, "Incorrect Username & Password.")
            return redirect('home')
            

    return render(request, 'signin.html')

def projects(request):
    return render(request, 'projects.html')

def profileproject(request):
    return render(request, 'profileproject.html')

def signout(request):
    logout(request)
    messages.success(request, "logged out successfully!")
    return redirect('home')