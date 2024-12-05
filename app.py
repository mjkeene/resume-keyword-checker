# from flask import Flask, request, jsonify
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# @app.route("/compare", methods=["POST"])
# def compare_texts():
#     data = request.json
#     resume = data.get("resume", "").lower()
#     job_description = data.get("jobDescription", "").lower()

#     # Tokenize and find unique words
#     resume_words = set(resume.split())
#     job_description_words = set(job_description.split())

#     # Find missing words
#     missing_words = list(job_description_words - resume_words)

#     return jsonify({"missingWords": missing_words})

# if __name__ == "__main__":
#     app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
import spacy
from sklearn.metrics.pairwise import cosine_similarity

# Load spaCy model for NLP tasks
nlp = spacy.load("en_core_web_md")

app = Flask(__name__)
CORS(app)

def compare_keywords(resume_text, job_description_text):
    resume_doc = nlp(resume_text.lower())
    job_desc_doc = nlp(job_description_text.lower())

    # Extract relevant keywords (nouns and proper nouns)
    resume_keywords = [token.text for token in resume_doc if token.pos_ in ['NOUN', 'PROPN']]
    job_desc_keywords = [token.text for token in job_desc_doc if token.pos_ in ['NOUN', 'PROPN']]

    # Find missing keywords
    missing_keywords = set(job_desc_keywords) - set(resume_keywords)

    # Calculate semantic similarity between job description and resume
    resume_vector = resume_doc.vector
    job_desc_vector = job_desc_doc.vector
    similarity_score = cosine_similarity([resume_vector], [job_desc_vector])[0][0]

    # Convert to standard Python float to avoid
    # TypeError: Object of type float32 is not JSON serializable
    similarity_score = float(similarity_score)

    return missing_keywords, similarity_score

@app.route('/compare', methods=['POST'])
def compare():
    data = request.get_json()
    resume_text = data['resume']
    job_description_text = data['job_description']

    missing_keywords, similarity_score = compare_keywords(resume_text, job_description_text)

    return jsonify({
        'missing_keywords': list(missing_keywords),
        'similarity_score': similarity_score
    })

if __name__ == '__main__':
    app.run(debug=True)