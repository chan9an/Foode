from typing import List, Dict
from datetime import datetime
import pandas as pd

# Simulated CO₂ emissions in grams per ingredient (per 100g)
ingredient_co2_data = {
    "tomato": 120,     # g CO₂ eq
    "pasta": 200,
    "garlic": 90,
    "avocado": 1500,
    "bread": 250,
    "salt": 50,
    "broccoli": 120,
    "soy sauce": 180,
    "carrot": 100
}


# Sample recipe database
recipe_db = [
    {
        "name": "Tomato Pasta",
        "ingredients": ["tomato", "pasta", "garlic"],
        "co2_score": 12.5,
        "addons": ["basil", "cheese"]
    },
    {
        "name": "Avocado Toast",
        "ingredients": ["avocado", "bread", "salt"],
        "co2_score": 8.3,
        "addons": ["chili flakes", "lemon juice"]
    },
    {
        "name": "Veggie Stir Fry",
        "ingredients": ["broccoli", "soy sauce", "carrot"],
        "co2_score": 10.2,
        "addons": ["tofu", "sesame oil"]
    }
]


def suggest_recipes(user_ingredients: List) -> List[Dict]:
    suggestions = []

    expiry_dict = {
        item.name.lower(): datetime.strptime(item.expiry, "%Y-%m-%d")
        for item in user_ingredients
    }

    today = datetime.today()

    for recipe in recipe_db:
        matched = []
        urgency = 0

        for ingredient in recipe["ingredients"]:
            if ingredient.lower() in expiry_dict:
                matched.append(ingredient)
                days_left = (expiry_dict[ingredient.lower()] - today).days
                urgency += max(0, (7 - days_left))  # Closer expiry → more urgency

        if matched:
            match_score = len(matched) / len(recipe["ingredients"])

            # Missing ingredients
            missing = [ing for ing in recipe["ingredients"] if ing.lower() not in expiry_dict]

            # CO₂ calc (same as before)
            total_co2 = sum(ingredient_co2_data.get(ing.lower(), 200) for ing in recipe["ingredients"])
            avg_co2 = round(total_co2 / len(recipe["ingredients"]), 2)

            suggestions.append({
                "recipe": recipe["name"],
                "matched_ingredients": matched,
                "missing_ingredients": missing,
                "recommended_addons": recipe.get("addons", []),
                "urgency_score": urgency,
                "match_percent": round(match_score * 100, 1),
                "avg_co2_score": avg_co2,
                "eco_rating": "🌿 Low" if avg_co2 < 200 else "⚠️ Medium" if avg_co2 < 500 else "🚨 High"
            })

    suggestions.sort(key=lambda x: (-x["urgency_score"], -x["match_percent"]))
    return suggestions