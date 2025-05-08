from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from collections import Counter
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load products dataset
products = pd.read_csv('products.csv')
# Preprocess tags: replace commas with spaces for TF-IDF
products['Product Tags'] = products['Product Tags'].str.replace(',', ' ')

# Initialize TF-IDF Vectorizer
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(products['Product Tags'])

def generate_message(browsed_products, products_df):
    if not browsed_products:
        return "Here are some recommendations for you!"
    browsed_df = products_df[products_df['Product Name'].isin(browsed_products)]
    all_tags = ' '.join(browsed_df['Product Tags']).split()
    tag_counts = Counter(all_tags)
    top_tags = [tag for tag, count in tag_counts.most_common(2)]
    if len(top_tags) == 1:
        return f"Since you liked {top_tags[0]} products, you might love these too!"
    elif len(top_tags) == 2:
        return f"Since you liked {top_tags[0]} and {top_tags[1]} products, you might love these too!"
    return "Here are some recommendations for you!"

def get_recommendations(browsed_products, category=None):
    filtered_products = products
    if category:
        filtered_products = products[products['Product Category'] == category]
    
    if not browsed_products:
        return filtered_products.sample(3)[['Product Name', 'Product Category', 'Price']].to_dict('records')
    
    tfidf_matrix_filtered = tfidf_matrix[filtered_products.index]
    browsed_indices = products[products['Product Name'].isin(browsed_products)].index
    
    if len(browsed_indices) == 0:
        return filtered_products.sample(3)[['Product Name', 'Product Category', 'Price']].to_dict('records')
    
    browsed_tfidf = tfidf_matrix[browsed_indices].mean(axis=0)
    similarities = cosine_similarity(browsed_tfidf, tfidf_matrix_filtered)[0]
    filtered_indices = filtered_products.index
    top_indices = [filtered_indices[i] for i in np.argsort(similarities)[::-1] if filtered_indices[i] not in browsed_indices][:3]
    
    if not top_indices:
        return filtered_products.sample(3)[['Product Name', 'Product Category', 'Price']].to_dict('records')
    
    return filtered_products.loc[top_indices][['Product Name', 'Product Category', 'Price']].to_dict('records')


@app.route('/')
def index():
    return '<h1>Welcome to Marketspace Recommendation App</h1>'

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.json
        browsed_products = data.get('browsed_products', [])
        category = data.get('category', None)
        recommendations = get_recommendations(browsed_products, category)
        message = generate_message(browsed_products, products)
        return jsonify({'recommendations': recommendations, 'message': message})
    except Exception as e:
        return jsonify({'message': f'Error: {str(e)}', 'recommendations': []}), 500

@app.route('/log_click', methods=['POST'])
def log_click():
    try:
        data = request.json
        product = data.get('product')
        with open('click_log.txt', 'a') as f:
            f.write(f"{product}\n")
        return jsonify({'status': 'logged'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500



if __name__ == '__main__':
    app.run(port=5000, debug=True)