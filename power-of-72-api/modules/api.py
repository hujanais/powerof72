from yahoo_fin import stock_info as si
from datetime import datetime, timedelta
import pandas as pd
import warnings

import json

warnings.filterwarnings(
    "ignore",
    message="The behavior of 'to_datetime' with 'unit' when parsing strings is deprecated.",
)

def cost_average(self, ticker, principal, addition, frequency, start_date, num_months):
    end_date = start_date + timedelta(days=num_months * 30)
    df_prices = si.get_data(ticker, start_date, end_date)
    df_dividends = si.get_dividends(ticker, start_date=start_date, end_date=end_date)

    # build result dataFrame
    dfResults = pd.DataFrame(columns=["Date", "BalanceNoDivs", "Balance"])

    # calculate the initial number of shares.
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

        if currentDate.weekday() == 4 and deltaDays >= freq_days:
            newShares = addition / closePrice
            totalShares += newShares
            totalSharesWithDivs += newShares
            print(f"invest on {currentDate} - {deltaDays} - {newShares}")
            last_invest_date = currentDate

        # update
        balance = totalShares * closePrice
        balanceWithDiv = totalSharesWithDivs * closePrice

        dfResults.loc[len(dfResults)] = [currentDate, balance, balanceWithDiv]

    return dfResults
