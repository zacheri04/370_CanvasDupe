import csv
from faker import Faker
from random import choice

fake = Faker()

def generate_university_csv(file_path: str, num_rows: int):
    emails = set()

    def get_unique_email(first, last, domain="bradley.edu"):
        base = f"{first.lower()}.{last.lower()}"
        email = f"{base}@{domain}"
        counter = 1
        while email in emails:
            email = f"{base}{counter}@{domain}"
            counter += 1
        emails.add(email)
        return email

    with open(file_path, mode="w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerow([
            "University_id", "F_name", "L_name", "Gender", "Perf_name", "Email", "Password"
        ])

        for i in range(1, num_rows + 1):
            gender = choice(["M", "F"])
            first_name = fake.first_name_male() if gender == "M" else fake.first_name_female()
            last_name = fake.last_name()
            perf_name = first_name
            email = get_unique_email(first_name, last_name)
            password = fake.password(length=12)

            writer.writerow([
                i,
                first_name,
                last_name,
                gender,
                perf_name,
                email,
                password
            ])

    print(f"Created file: {file_path} with {num_rows} rows.")

generate_university_csv("person.csv", 10000)