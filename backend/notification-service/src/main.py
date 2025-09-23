# src/main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn

app = FastAPI(title="Notification Service")

# Example notification model
class Notification(BaseModel):
    user_id: int
    message: str

# Health check
@app.get("/health")
async def health():
    return {"status": "ok", "service": "notification-service"}

# Send notification (dummy implementation)
@app.post("/send")
async def send_notification(notification: Notification):
    # Yahan aap real notification logic (email, push, etc.) daal sakte ho
    print(f"Sending notification to user {notification.user_id}: {notification.message}")
    return {"status": "sent", "user_id": notification.user_id, "message": notification.message}

if __name__ == "__main__":
    uvicorn.run("src.main:app", host="0.0.0.0", port=4003, reload=True)
