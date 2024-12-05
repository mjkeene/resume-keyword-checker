import spacy
from gensim.models import KeyedVectors
from sklearn.metrics.pairwise import cosine_similarity

# Load spaCy model for NLP tasks
nlp = spacy.load("en_core_web_md")

# Load pre-trained Word2Vec model (if you want a more complex version, use Gensim)
# word_vectors = KeyedVectors.load_word2vec_format("path/to/word2vec.bin", binary=True)

# Sample resume and job description
resume_text = "Experienced Python developer with knowledge in Django and AWS."
job_description = "Looking for a Python developer with experience in Django and cloud technologies like AWS."

# Process text using spaCy
resume_doc = nlp(resume_text)
job_desc_doc = nlp(job_description)

# Extract the most relevant keywords/phrases (in this case, we'll use named entities and important nouns)
resume_keywords = [token.text for token in resume_doc if token.pos_ in ['NOUN', 'PROPN']]
job_desc_keywords = [token.text for token in job_desc_doc if token.pos_ in ['NOUN', 'PROPN']]

# Compare the sets of keywords (e.g., using cosine similarity or simple intersection)
def compare_keywords(resume_keywords, job_desc_keywords):
    # Optional: Use word embeddings to compute more intelligent matching
    missing_keywords = set(job_desc_keywords) - set(resume_keywords)
    
    # Optionally, you could compare embeddings using cosine similarity for more advanced matching
    resume_vector = resume_doc.vector
    job_desc_vector = job_desc_doc.vector
    similarity = cosine_similarity([resume_vector], [job_desc_vector])
    
    return missing_keywords, similarity

missing_keywords, similarity = compare_keywords(resume_keywords, job_desc_keywords)
print("Missing Keywords:", missing_keywords)
print("Semantic Similarity Score:", similarity)