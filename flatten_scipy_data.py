"""Take the data shared by Jiefu and
convert them to be flattened.
"""
import csv
import json


__SELECTED_KEYS__ = [
    "yXYJPAlLqn0",
    "yBd2UREDNL",
    "xQbFsx8usC0",
    "x2W2dKdNI80",
    "vMpmabFTFw1",
    "xX2KjzdFPH0"
]


def main():

    with open("src/assets/pdf_links.json", 'r', encoding='utf-8') as file_:
        pdf_data = json.load(file_)

    with open("src/assets/dev-data-with-cluster-and-span.csv", 'w', encoding='utf-8') as wfile_:
        writer = csv.DictWriter(wfile_, fieldnames=["id", "payload"])
        writer.writeheader()

        with open("src/assets/dev-data-with-cluster-with-spans.json", 'r', encoding='utf-8') as file_:
            for idx, (key, val) in enumerate(json.load(file_).items()):
                if key not in __SELECTED_KEYS__:
                    continue
                val = {**val, **{"id": key, "pdf": pdf_data[val['meta']['id']]}}
                response = val.pop("response")
                for widx, weakness in enumerate(response["Weakness associated with claims"]):
                    print(weakness.keys())
                    val['response'] = weakness
                    val['meta']['weakness_idx'] = widx
                    writer.writerow({"payload": json.dumps(val), "id": idx})


if __name__ == "__main__":
    main()
