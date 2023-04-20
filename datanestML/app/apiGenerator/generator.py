import spacy
from .trainModel import startTraining
nlp = spacy.load("en_core_web_sm")


def generator(command):
    startTraining()
    entities = {}
    doc = nlp(command)
    print(doc.ents)
    for ent in doc.ents:
        entities[ent.label_] = ent.text

    endpoint = entities.get("endpoint")
    print(entities)
    if not endpoint:
        return "Please provide an endpoint."

    method = entities.get("methods", "GET")

    handler = ""
    if method == "GET":
        if "id" in entities:
            handler = (
                f"(req, res) => {{res.send(find('{endpoint}', {{id: req.params.id}}))}}"
            )
        else:
            handler = f"(req, res) => {{res.send(getAll('{endpoint}'))}}"
    elif method == "POST":
        handler = f"(req, res) => {{add('{endpoint}', req.body); res.send('{endpoint.capitalize()} created')}}"
    elif method == "PUT":
        handler = f"(req, res) => {{let {endpoint} = find('{endpoint}', {{id: req.params.id}}); if ({endpoint}) {{{endpoint}.name = req.body.name; {endpoint}.email = req.body.email; res.send('{endpoint.capitalize()} updated')}} else {{res.send('{endpoint.capitalize()} not found')}}}}"
    elif method == "DELETE":
        handler = f"(req, res) => {{let {endpoint} = find('{endpoint}', {{id: req.params.id}}); if ({endpoint}) {{delete('{endpoint}', {endpoint}); res.send('{endpoint.capitalize()} deleted')}} else {{res.send('{endpoint.capitalize()} not found')}}}}"
    else:
        return "Invalid method provided."

    return {
        "endpoints": [
            {
                "path": "/",
                "method": "GET",
                "handler": "(req, res) => {res.send('Hello World!')}",
            },
            {"path": f"/{endpoint}", "method": method, "handler": handler},
        ]
    }
