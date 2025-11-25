import jwt
from datetime import datetime, timedelta

SECRET="a7de5c28d1e56b9091d9a49bb4ff3db97b8dc9e98191f3df18754fe59c0dac6b1f1e5d3a776be80aaf5180d0c92cf27e8bdd9ec48816ba0ef1086fefb22dde19"
ALGORITHM = "HS256"

def create_token(data: dict):
    payload = data.copy()
    payload["exp"] = datetime.utcnow() + timedelta(hours=2)
    return jwt.encode(payload, SECRET, algorithm=ALGORITHM)


def decode_token(token: str):
    try:
        return jwt.decode(token, SECRET, algorithms=[ALGORITHM])
    except:
        return None
