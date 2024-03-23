import json
from pathlib import Path

# TODO : Getting openapi.json directly from FastApi app

file_path = Path("./openapi.json")
openapi_content = json.loads(file_path.read_text())

for path_data in openapi_content["paths"].values():
    for http_verb, operation in path_data.items():
        tag = operation["tags"][0]
        operation_id = operation["operationId"]
        separator = f"_{tag}_"
        pieces = str(operation_id).rsplit(separator, maxsplit=1)
        new_operation_id = (
            "".join(map(lambda x: x.capitalize(), pieces[0].split("_")))
            + str(http_verb).capitalize()
        )
        operation["operationId"] = new_operation_id


Path("./openapi_simplify.json").write_text(json.dumps(openapi_content))
