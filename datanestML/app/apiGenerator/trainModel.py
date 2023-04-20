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
    ner.add_label("methods")
    ner.add_label("endpoint")
    ner.add_label("api")

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
    (
        "Create a GET endpoint to retrieve user data",
        {"entities": [(7, 10, "method"), (11, 14, "endpoint"), (26, 35, "endpoint")]},
    ),
    (
        "Add a POST endpoint to create a new user",
        {"entities": [(4, 8, "method"), (9, 13, "endpoint"), (27, 35, "endpoint")]},
    ),
    (
        "Update the PUT endpoint for editing user data",
        {"entities": [(8, 11, "method"), (12, 15, "endpoint"), (25, 34, "endpoint")]},
    ),
    (
        "Add a DELETE endpoint for removing user data",
        {"entities": [(4, 10, "method"), (11, 17, "endpoint"), (30, 39, "endpoint")]},
    ),
    (
        "Create a new API endpoint for retrieving all user data",
        {"entities": [(11, 14, "method"), (24, 27, "api"), (44, 53, "endpoint")]},
    ),
    (
        "Add an API endpoint for user authentication",
        {"entities": [(3, 6, "method"), (7, 10, "api"), (22, 35, "endpoint")]},
    ),
    (
        "Update the PATCH endpoint for editing user data",
        {"entities": [(8, 13, "method"), (14, 19, "endpoint"), (31, 40, "endpoint")]},
    ),
    (
        "Create a GET endpoint to retrieve a single user's data",
        {"entities": [(7, 10, "method"), (11, 14, "endpoint"), (27, 34, "endpoint")]},
    ),
    (
        "Add a PUT endpoint for updating a user's data",
        {"entities": [(4, 7, "method"), (8, 11, "endpoint"), (28, 37, "endpoint")]},
    ),
    (
        "Create a new API endpoint for managing user accounts",
        {"entities": [(11, 14, "method"), (15, 18, "api"), (39, 52, "endpoint")]},
    ),
    (
        "Add a PATCH endpoint for updating a user's data",
        {"entities": [(4, 9, "method"), (10, 15, "endpoint"), (29, 38, "endpoint")]},
    ),
    (
        "Create a new endpoint for retrieving user profile data",
        {"entities": [(11, 15, "method"), (16, 24, "endpoint"), (39, 49, "endpoint")]},
    ),
    (
        "Add a new endpoint for retrieving user activity data",
        {"entities": [(4, 7, "method"), (8, 12, "endpoint"), (33, 44, "endpoint")]},
    ),
    (
        "Create a new API endpoint for user messaging",
        {"entities": [(11, 14, "method"), (15, 18, "api"), (31, 42, "endpoint")]},
    ),
    (
        "Add an endpoint for retrieving user contact information",
        {"entities": [(3, 6, "method"), (7, 12, "endpoint"), (29, 47, "endpoint")]},
    ),
]


def startTraining():
    train_model(nlp, TRAIN_DATA)
    # Test the updated model on some new texts
    test_texts = [
        "Create a GET endpoint to retrieve user data",
        "Add an api endpoint for user authentication",
    ]

    for text in test_texts:
        doc = nlp(text)
        print("Results:::", [(ent.text, ent.label_) for ent in doc.ents])


startTraining()
