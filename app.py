from flask import Flask, render_template, request, redirect, url_for, jsonify, session
from flask import flash
import pandas as pd
import joblib
import mysql.connector
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash  # Import this
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Initialize Flask app
app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Set your secret key for session management

# Load the trained model
model_path = r'C:\dissert\model\stress_score_model.pkl'
model = joblib.load(model_path)

# Database connection function
def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='root',
            password='',
            database='stress_prediction'  # Change to your actual database name
        )
        return connection
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None
def send_email(to_email, subject, body):
    try:
        # Set up SMTP server details (using Gmail for this example)
        smtp_server = "smtp.gmail.com"
        smtp_port = 587
        sender_email = "shadshishakshi@gmail.com"  # Replace with your email
        sender_password = "ousj ftjv otpy swkv"  # Replace with your email password (or app password for Gmail)

        # Create the email content
        message = MIMEMultipart()
        message["From"] = sender_email
        message["To"] = to_email
        message["Subject"] = subject
        
        # Attach the body of the email
        message.attach(MIMEText(body, "plain"))

        # Send the email
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()  # Start TLS encryption
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, to_email, message.as_string())  # Send email

        print(f"Email successfully sent to {to_email}")
    except Exception as e:
        print(f"Error sending email: {str(e)}")

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Retrieve form data
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        hashed_password = generate_password_hash(password)

        # Insert the user data into the database
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("INSERT INTO users (username, email, password) VALUES (%s, %s, %s)", 
                       (username, email, hashed_password))
        connection.commit()
        connection.close()

        # Flash success message
        flash("Successfully registered! You can now log in.", "success")

        # Redirect to the login page after successful registration
        return redirect(url_for('register'))

    return render_template('register.html')

# User Login Route
from flask import flash, render_template, request, redirect, url_for, session
from werkzeug.security import check_password_hash  # Ensure you're using check_password_hash for password verification

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Check for Admin Login
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM admins WHERE username = %s", (username,))
        admin = cursor.fetchone()

        # Check if it's an admin login
        if admin and admin['password'] == password:
            # Admin login successful, set session and redirect to admin dashboard
            session['user_id'] = admin['id']
            session['role'] = 'admin'
            return redirect(url_for('admindash'))

        # Check for User Login
        cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
        user = cursor.fetchone()

        if user and check_password_hash(user['password'], password):
            # User login successful, set session and redirect to home page
            session['user_id'] = user['id']
            session['role'] = 'user'
            return redirect(url_for('index'))

        # If login fails, flash an error message
        flash("Invalid username or password.", "danger")

        # Return the login page with the error message
        return redirect(url_for('login'))

    return render_template('login.html')
    

# Insert contact form submission into the database
def insert_contact_form(name, email, phone, school_name, message):
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor()
        cursor.execute("""
            INSERT INTO contact_form (name, email, phone, school_name, message)
            VALUES (%s, %s, %s, %s, %s)
        """, (name, email, phone, school_name, message))
        connection.commit()
        connection.close()
    else:
        print("Failed to connect to the database.")

# Insert prediction result into the database
def insert_prediction(gender, sleep, diet, suicidal, study_hours, financial_stress, conflict, mood, depression, predicted_score, stress_level):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("""
        INSERT INTO predictions (gender, sleep, diet, suicidal, study_hours, financial_stress, conflict, mood, depression, predicted_score, stress_level)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (gender, sleep, diet, suicidal, study_hours, financial_stress, conflict, mood, depression, predicted_score, stress_level))
    connection.commit()
    connection.close()


# In-memory storage for results 
predictions_data = []

# Home Page - This will now check if the user is logged in or not
@app.route('/')
def home():
    # Check if the user is logged in (using session)
    if 'user_id' in session:  # User is logged in
        return redirect(url_for('index'))  # Redirect to the main page 
    else:  # User is not logged in
        return redirect('/login')  # Redirect to login page

@app.route('/index')
def index():
    return render_template('index.html')  # Home page
    
# Route for About page
@app.route('/about')
def about():
    return render_template('about.html')

# Route for Service page
@app.route('/service')
def service():
    return render_template('service.html')

# Route for handling contact form submission
from flask import flash, render_template, request, jsonify

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        try:
            # Attempt to retrieve form fields
            name = request.form['name']
            email = request.form['email']
            phone = request.form['phone']
            school_name = request.form['school_name']
            message = request.form['message']

            # Insert data into the contact_form table
            insert_contact_form(name, email, phone, school_name, message)

            # Flash success message
            flash("Message successfully sent!", "success")

            # Redirect back to the contact page to display the success message
            return redirect(url_for('contact'))

        except KeyError as e:
            print(f"Missing key: {e}")
            return jsonify({
                'result': f"Missing form field: {str(e)}"
            })

    return render_template('contact.html')

@app.route('/feature', methods=['GET', 'POST'])
def feature():
    if request.method == 'POST':
        # Get form data from user input
        gender = int(request.form['gender'])
        sleep = int(request.form['sleep'])
        diet = int(request.form['diet'])
        suicidal = int(request.form['suicidal'])
        study_hours = int(request.form['study_hours'])
        financial_stress = int(request.form['financial_stress'])
        conflict = int(request.form['conflict'])
        mood = float(request.form['mood'])
        depression = int(request.form['depression'])

        # Prepare the input data in the correct format (Pandas DataFrame)
        input_data = {
            'gender': [gender],
            'sleep': [sleep],
            'diet': [diet],
            'suicidal': [suicidal],
            'study_hours': [study_hours],
            'financial_stress': [financial_stress],
            'conflict': [conflict],
            'mood': [mood],
            'depression': [depression]
        }

        input_df = pd.DataFrame(input_data)

        # Predict the stress score using the loaded model
        predicted_score = model.predict(input_df)[0]

        # Determine stress level based on the predicted score
        if predicted_score >= 75:
            stress_level = "High Stress"
            # Send email for High Stress
            send_email(
                to_email="shadshikashadshika@gmail.com",  # Replace with actual parent's email
                subject="Stress Alert: High Stress Detected",
                body=f"Alert: Your child has been predicted to have High Stress. The stress score is {predicted_score}. Please take necessary actions."
            )
        elif 60 <= predicted_score < 75:
            stress_level = "Normal Stress"
            # Send email for Normal Stress
            send_email(
                to_email="shadshikashadshika@gmail.com",  # Replace with actual parent's email
                subject="Stress Alert: Normal Stress Detected",
                body=f"Alert: Your child has been predicted to have Normal Stress. The stress score is {predicted_score}. Please take necessary actions."
            )
        else:
            stress_level = "Low stress"
            # No email for Low Stress

        # Insert prediction into the database
        insert_prediction(gender, sleep, diet, suicidal, study_hours, financial_stress, conflict, mood, depression, predicted_score, stress_level)

        # Success message
        success_message = "Prediction was successfully made and saved."

        # Return the success message and the prediction result to be displayed on the template
        return render_template('prediction.html', success_message=success_message, stress_level=stress_level, predicted_score=predicted_score)

    return render_template('prediction.html')# Route for Admin Dashboard (View All Predictions)

@app.route('/admindash')
def admin_dashboard():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)  # Ensures results are returned as a dictionary
    cursor.execute("SELECT * FROM predictions")
    predictions = cursor.fetchall()  # Fetch all rows from the database
    connection.close()
    return render_template('admindash.html', predictions=predictions)  # Passing data to template

@app.route('/delete_prediction/<int:prediction_id>', methods=['GET'])
def delete_prediction(prediction_id):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("DELETE FROM predictions WHERE id = %s", (prediction_id,))
    connection.commit()
    connection.close()
    return redirect(url_for('admindash'))

@app.route('/view_prediction/<int:prediction_id>', methods=['GET'])
def view_prediction(prediction_id):
    # Connect to the database
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)  # Ensure results are returned as a dictionary
    
    # Execute the query to fetch the prediction based on ID
    cursor.execute("SELECT * FROM predictions WHERE id = %s", (prediction_id,))
    prediction = cursor.fetchone()  # Fetch a single row for the prediction
    
    # Close the connection to the database
    connection.close()
    
    # Check if the prediction was found, then pass it to the template
    if prediction:
        return render_template('view_prediction.html', prediction=prediction)
    else:
        flash("Prediction not found.", "danger")
        return redirect(url_for('admindash'))  # Redirect to the admin dashboard if not found

# Route for Product page (Additional page examples)
@app.route('/meditation')
def meditation_page():
    return render_template('meditation.html')

@app.route('/game')
def game():
    return render_template('game.html')

@app.route('/puzzle')
def puzzle():
    return render_template('puzzle.html')

@app.route('/bubbleshoot')
def bubbleshoot():
    return render_template('bubbleshoot.html')

@app.route('/cardmatch')
def cardmatch():
    return render_template('cardmatch.html')


@app.route('/cards')
def cards():
    return render_template('cards.html')

@app.route('/admindash')
def admindash():
    return render_template('admindash.html')

@app.route('/chot')
def chot():
    return render_template('chot.html')

@app.route('/memoryseq')
def memoryseq():
    return render_template('memoryseq.html')

@app.route('/mole')
def mole():
    return render_template('mole.html')

@app.route('/moodtracker')
def moodtracker():
    return render_template('moodtracker.html')

@app.route('/pixelart')
def pixelart():
    return render_template('pixelart.html')

@app.route('/shoot')
def shoot():
    return render_template('shootgame.html')


# Route for Testimonial page
@app.route('/relaxation')
def relaxation():
    return render_template('relaxtionmusic.html')

@app.route('/voicecommand')
def voicecommand():
    return render_template('voicecommand.html')


if __name__ == '__main__':
    app.run(debug=True)