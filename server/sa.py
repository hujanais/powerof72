from plistlib import InvalidFileException
from yahoo_fin import stock_info as si
from datetime import datetime, timedelta
import pandas as pd
import warnings

warnings.filterwarnings(
    "ignore",
    message="The behavior of 'to_datetime' with 'unit' when parsing strings is deprecated.",
)


def cost_average(ticker, principal, addition, frequency, start_date, num_months):
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
        freq_weeks = 1
    elif frequency == "biweekly":
        freq_days = 3
        freq_weeks = 2
    elif frequency == "monthly":
        freq_days = 30
        freq_weeks = 4
    elif frequency == "annually":
        freq_days = 365
        freq_weeks = 52
    elif frequency == "biannually":
        freq_days = 365 // 2
        freq_weeks = 52 // 2
    elif frequency == "quarterly":
        freq_days = 365 // 4
        freq_weeks = 52 // 4
    else:
        raise ValueError(
            "Frequency must be one of 'weekly', 'biweekly', 'monthly', 'annually', 'biannually', or 'quarterly'."
        )

    invest_count = 0
    for index, row in df_prices[1:].iterrows():
        currentDate = index
        closePrice = row["close"]

        # check of dividend payout
        if currentDate in df_dividends.index:
            dividend = df_dividends.loc[currentDate]["dividend"]
            newShares = dividend * totalShares / closePrice
            totalSharesWithDivs += newShares

        # print 'invest' every frequency_weeks on Fridays
        if currentDate.weekday() == 4 and invest_count % freq_weeks == 0:
            print(f"invest on {currentDate}")
            invest_count += 1

        # increment invest count only on Fridays
        if currentDate.weekday() == 4:
            invest_count += 1

        # update
        balance = totalShares * closePrice
        balanceWithDiv = totalSharesWithDivs * closePrice

        dfResults.loc[len(dfResults)] = [currentDate, balance, balanceWithDiv]

    print(dfResults.tail(10))


ticker = "SCHD"
start_date = datetime(2010, 1, 1)
principal = 1000
frequency = "annually"  # 'weekly', 'biweekly', 'monthly', 'annually', 'biannually', or 'quarterly'
addition = 0
nMonths = 48

balance = cost_average(ticker, 1000, addition, frequency, start_date, nMonths)
