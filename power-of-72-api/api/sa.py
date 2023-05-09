from modules.api import cost_average
from datetime import datetime, timedelta
from http.server import BaseHTTPRequestHandler
from urllib import parse


class handler(BaseHTTPRequestHandler):
    # GET /api/sa?ticker=xxx&principal=1000&addition=0&frequency=monthly&startdate=MM-dd-yyyy&months=48
    def do_GET(self):
        # querystring ?ticker=xxx&expiry=xx-xx-xxxx
        dic = dict(parse.parse_qsl(parse.urlsplit(self.path).query))
        ticker = dic["ticker"]
        strStartDate = dic["startdate"]  # 03-15-2019
        startDate = datetime.strptime(strStartDate, "%m-%d-%Y")
        principal = dic["principal"]
        addition = dic["addition"]
        frequency = dic["frequency"]
        nMonths = dic["months"]

        print(strStartDate, startDate)

        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.end_headers()

        df = cost_average(ticker, principal, addition, frequency, startDate, nMonths)
        jsonData = df[["Date", "BalanceNoDivs", "Balance"]].to_json(orient="records")

        self.wfile.write(jsonData.encode(encoding="utf_8"))


# ticker = "O"
# start_date = datetime(1996, 1, 1)
# principal = 0
# frequency = "monthly"  # 'weekly', 'biweekly', 'monthly', 'annually', 'biannually', or 'quarterly'
# addition = 1000
# nMonths = 12 * 28

# handler = handler()
# balance = handler.cost_average(ticker, 1000, addition, frequency, start_date, nMonths)
