# backend/main.py

from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from .recipe_engine import suggest_recipes

app = FastAPI()

class IngredientItem(BaseModel):
    name: str
    expiry: str  # Format: 'YYYY-MM-DD'

class IngredientInput(BaseModel):
    items: List[IngredientItem]


@app.post("/recommend")
def get_recommendations(data: IngredientInput):
    result = suggest_recipes(data.items)
    return {"recommendations": result}

@app.get("/")
def home():
    return {"message": "Naman’s SmartMeal+ backend is running 🚀"}