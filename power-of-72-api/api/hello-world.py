from modules.api import cost_average
from datetime import datetime, timedelta
from http.server import BaseHTTPRequestHandler


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/plain")
        self.end_headers()

        ticker = "O"
        start_date = datetime(1996, 1, 1)
        principal = 1000
        frequency = "monthly"  # 'weekly', 'biweekly', 'monthly', 'annually', 'biannually', or 'quarterly'
        addition = 1000
        nMonths = 12

        df = cost_average(ticker, principal, addition, frequency, start_date, nMonths)
        jsonData = df[["Date", "BalanceNoDivs", "Balance"]].to_json(orient="records")

        self.wfile.write(jsonData.encode(encoding="utf_8"))
        return
