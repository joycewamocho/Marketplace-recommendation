# Smart Shop - Personalized Product Recommendations

## Project Overview

Smart Shop is a web-based marketplace that recommends products based on the user's browsing history. This application uses content-based filtering with TF-IDF and cosine similarity to generate personalized product suggestions.

### Features

* Personalized product recommendations based on browsing history
* Category-based filtering for refined suggestions
* Click logging to track user interactions
* Responsive and intuitive UI

## Tech Stack

* **Backend**: Flask, Pandas, NumPy, scikit-learn, Flask-CORS
* **Frontend**: Next.js, React, Tailwind CSS, Lucide Icons,SweatAlert
* **Database**: CSV file (products.csv)

## Installation and Setup

### Prerequisites

* Python 3.8+
* Node.js and npm

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/smart-shop.git
   cd server
   ```
2. Create and activate a virtual environment:

   ```bash
   pipenv install
   pipenv shell  
   ```
3. Run the Flask server:

   ```bash
   python app.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd client
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Run the development server:

   ```bash
   npm run dev
   ```

### Access the App

Open your browser and visit:

```
http://localhost:3000
```

## Recommendation Approach

The recommendation system uses content-based filtering:

1. Preprocess product tags using TF-IDF.
2. Calculate cosine similarity between the tags of browsed products and all products.
3. Recommend the top 3 products that have the highest similarity scores.

## Assumptions

* Browsing history is simulated using user inputs.
* The dataset (products.csv) contains at least 100 products.

## Usage

1. Enter the products you have browsed in the input field.
2. Optionally, specify a preferred category.
3. Click "Get Recommendations" to see personalized suggestions.

## Click Logging

* User clicks on recommended products which are logged for analytics.
* Logs are stored in a file named `click_log.txt` on the server.

## Contributing

Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.

Joyce Wamocho
