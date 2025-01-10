import csv
import json


def main():
    
    with open("public/pdf_links.json", 'r', encoding='utf-8') as file_:
        pdf_data = json.load(file_)
    
    with open("public/dev-data.csv", 'w', encoding='utf-8') as wfile_:
        writer = csv.DictWriter(wfile_, fieldnames=["id", "payload"])
        writer.writeheader()
        with open("public/dev-data-with-cluster-with-spans.json", 'r', encoding='utf-8') as file_:
            for idx, (key, val) in enumerate(json.load(file_).items()):
                val = {**val, **{"id": key, "pdf": pdf_data[val['meta']['id']]}}
                writer.writerow({"payload": json.dumps(val), "id": idx})
                
                
if __name__ == "__main__":
    main()