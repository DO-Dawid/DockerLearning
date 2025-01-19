from django.db import models

class Expense(models.Model):
    description = models.CharField(max_length=255)  # Opis wydatku
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # Kwota
    date = models.DateField(auto_now_add=True)  # Data dodania

    def __str__(self):
        return f"{self.description} - {self.amount} PLN"
