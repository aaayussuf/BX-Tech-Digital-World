import re


def format_phone(phone):
    """
    Converts Kenyan phone numbers into 2547XXXXXXXX format.

    Examples

    0712345678
    -> 254712345678

    +254712345678
    -> 254712345678

    254712345678
    -> 254712345678
    """

    phone = re.sub(r"\s+", "", phone)

    if phone.startswith("+254"):
        phone = phone[1:]

    if phone.startswith("07"):
        phone = "254" + phone[1:]

    elif phone.startswith("7"):
        phone = "254" + phone

    if not re.fullmatch(r"2547\d{8}", phone):
        raise ValueError("Invalid Kenyan phone number")

    return phone