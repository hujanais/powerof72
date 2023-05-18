from yahoo_fin import stock_info as si
import datetime
import pandas as pd
import warnings

import json

warnings.filterwarnings(
    "ignore",
    message="The behavior of 'to_datetime' with 'unit' when parsing strings is deprecated.",
)


def cost_average(ticker, principal, addition, frequency, start_date, end_date):
    df_prices = si.get_data(ticker, start_date, end_date)
    df_dividends = si.get_dividends(ticker, start_date=start_date, end_date=end_date)

    # build result dataFrame
    dfResults = pd.DataFrame(columns=["Date", "Investment", "BalanceNoDivs", "Balance"])

    # calculate the initial number of shares.
    investment = principal
    balance = principal
    balanceWithDiv = principal
    totalShares = principal / df_prices.iloc[0].close
    totalSharesWithDivs = totalShares

    # set the frequency of investing
    if frequency == "weekly":
        freq_days = 7
    elif frequency == "biweekly":
        freq_days = 14
    elif frequency == "monthly":
        freq_days = 30
    elif frequency == "annually":
        freq_days = 365
    elif frequency == "biannually":
        freq_days = 365 // 2
    elif frequency == "quarterly":
        freq_days = 365 // 4
    else:
        raise ValueError(
            "Frequency must be one of 'weekly', 'biweekly', 'monthly', 'annually', 'biannually', or 'quarterly'."
        )

    last_invest_date = df_prices.index[0]
    for index, row in df_prices[1:].iterrows():
        currentDate = index
        closePrice = row["close"]

        # check of dividend payout
        if currentDate in df_dividends.index:
            dividend = df_dividends.loc[currentDate]["dividend"]
            newShares = dividend * totalShares / closePrice
            totalSharesWithDivs += newShares

        deltaDays = (currentDate - last_invest_date).days

        # cost average on first available Friday
        if currentDate.weekday() == 4 and deltaDays >= freq_days:
            investment = investment + addition
            newShares = addition / closePrice
            totalShares += newShares
            totalSharesWithDivs += newShares
            last_invest_date = currentDate

        # update
        balance = totalShares * closePrice
        balanceWithDiv = totalSharesWithDivs * closePrice

        # append data into the results dataframe but only for Fridays.
        if currentDate.weekday() == 4:
            dfResults.loc[len(dfResults)] = [
                currentDate,
                investment,
                balance,
                balanceWithDiv,
            ]

    return dfResults


def test():
    ticker = "VTI"
    principal = 1000
    addition = 100
    frequency = "monthly"

    today = datetime.date.today()
    numOfYears = 10
    start_date = today - datetime.timedelta(days=numOfYears * 365)
    dfResult = cost_average(ticker, principal, addition, frequency, start_date, today)

    jsonData = dfResult[["Date", "Investment", "BalanceNoDivs", "Balance"]].to_json(
        orient="records"
    )

    print(jsonData)


test()
