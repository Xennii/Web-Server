# Simple Web Server

This is a simple web server built with Flask that demonstrates various functionalities.

## Features

- Home page
- About page
- Contact form (handles POST requests)
- API endpoint returning JSON
- Serves static files (CSS)

## Installation

1. Clone the repository
2. Create a virtual environment: `python -m venv .venv`
3. Activate the virtual environment: `.venv\Scripts\activate` (Windows)
4. Install dependencies: `pip install -r requirements.txt`

## Running the Server

Run `python app.py`

The server will start on http://127.0.0.1:5000/

## Endpoints

- `/` - Home page
- `/about` - About page
- `/contact` - Contact form (GET and POST)
- `/api/data` - JSON API endpoint

## Usage

Open your browser and navigate to the URLs above.