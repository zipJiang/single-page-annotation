import argparse
import csv
import json



def main():
    
    parser = argparse.ArgumentParser()
    parser.add_argument("--pdflink-path", type=str, required=True)
    parser.add_argument("--data-path", type=str, required=True)
    parser.add_argument("--output-path", type=str, required=True)
    
    args = parser.parse_args()
    
    with open(args.pdflink_path, 'r', encoding='utf-8') as file_:
        pdf_data = json.load(file_)
    
    with open(args.output_path, 'w', encoding='utf-8') as wfile_:
        writer = csv.DictWriter(wfile_, fieldnames=["id", "payload"])
        writer.writeheader()
        with open(args.data_path, 'r', encoding='utf-8') as file_:
            for idx, (key, val) in enumerate(json.load(file_).items()):
                val = {**val, **{"id": key, "pdf": pdf_data.get(val['meta']['id'], "")}}
                writer.writerow({"payload": json.dumps(val), "id": idx})
                
                
if __name__ == "__main__":
    main()