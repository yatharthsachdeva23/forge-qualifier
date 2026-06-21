import requests
from bs4 import BeautifulSoup
import json

def scrape_url(url):
    print(f"Scraping {url}...")
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, 'html.parser')

        title = soup.title.string if soup.title else "No title found"

        headings = []
        for h in soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
            headings.append({
                'tag': h.name,
                'text': h.get_text(strip=True)
            })

        # Human-in-the-loop iteration: extract <a> tag URLs per user request
        links = []
        for a in soup.find_all('a', href=True):
            href = a['href']
            text = a.get_text(strip=True)
            if href.startswith('http') and text:
                links.append({
                    'text': text,
                    'href': href
                })

        return {
            'url': url,
            'title': title,
            'headings': headings,
            'links': links[:30]
        }
    except Exception as e:
        print(f"Error scraping {url}: {e}")
        return {
            'url': url,
            'error': str(e)
        }

def main():
    urls = [
        'https://news.ycombinator.com',
        'https://python.org',
        'https://github.com'
    ]

    results = []
    for url in urls:
        results.append(scrape_url(url))

    output_file = 'scrape_results.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=4, ensure_ascii=False)

    print(f"\nResults successfully exported to {output_file}")
    for r in results:
        print(f"  - {r.get('url')}: {len(r.get('headings', []))} headings, {len(r.get('links', []))} links")

if __name__ == "__main__":
    main()
