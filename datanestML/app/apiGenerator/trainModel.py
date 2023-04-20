# Import the required modules
import spacy
import random
from spacy.util import minibatch, compounding
from spacy.training import Example

# Define a function to create a new NER component with the new labels
def create_ner(nlp):
    # Get the NER component or create one if it doesn't exist
    if "ner" not in nlp.pipe_names:
        ner = nlp.create_pipe("ner")
        nlp.add_pipe(ner, last=True)
    else:
        ner = nlp.get_pipe("ner")

    # Add the new entity labels to the NER component
    ner.add_label("METHOD")
    ner.add_label("ENDPOINT")
    ner.add_label("API")

    return ner

# Define a function to train the model on new data
def train_model(nlp, data):
    # Disable other components during training
    other_pipes = [pipe for pipe in nlp.pipe_names if pipe != "ner"]
    with nlp.disable_pipes(*other_pipes):
        # Train for 10 iterations
        for itn in range(10):
            # Shuffle the training data
            random.shuffle(data)
            losses = {}
            # Batch up the examples using spaCy's minibatch
            batches = minibatch(data, size=compounding(4.0, 32.0, 1.001))
            for batch in batches:
                # Create a list of Example objects from the texts and annotations
                examples = []
                for text, annot in batch:
                    doc = nlp.make_doc(text)
                    example = Example.from_dict(doc, annot)
                    examples.append(example)
                # Update the model with the examples
                nlp.update(examples, drop=0.5, losses=losses)
            # Print the losses
            print("Losses", losses)

# Load the existing model
nlp = spacy.load("en_core_web_sm")

# Create a new NER component with the new labels
ner = create_ner(nlp)

# Prepare some sample training data with the new entity annotations
TRAIN_DATA = [
    ("I used the GET method to request data from the /users endpoint of the GitHub API.", {"entities": [(9, 12, "METHOD"), (37, 43, "ENDPOINT"), (51, 58, "API")]}),
    ("The POST method allows you to create a new resource at the /posts endpoint of the WordPress API.", {"entities": [(4, 8, "METHOD"), (47, 53, "ENDPOINT"), (61, 71, "API")]}),
    ("You can update an existing resource with the PUT method at the /products/{id} endpoint of the Shopify API.", {"entities": [(31, 34, "METHOD"), (38, 52, "ENDPOINT"), (60, 68, "API")]}),
    ("To delete a resource, use the DELETE method at the /comments/{id} endpoint of the JSONPlaceholder API.", {"entities": [(16, 22, "METHOD"), (26, 40, "ENDPOINT"), (48, 63, "API")]})
]

def startTraining():
    train_model(nlp, TRAIN_DATA)
    # Test the updated model on some new texts
    test_texts = [
        "How do I use the PATCH method to update a partial resource at the /todos/{id} endpoint of the Todoist API?",
        "What is the difference between the GET and POST methods for the /search endpoint of the Twitter API?"
    ]

    for text in test_texts:
        doc = nlp(text)
        print("Results:::", [(ent.text, ent.label_) for ent in doc.ents])



