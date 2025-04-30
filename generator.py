import csv
from faker import Faker
from random import choice

fake = Faker()

def generate_university_csv(file_path: str, num_rows: int):
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
            email = f"{first_name.lower()}.{last_name.lower()}@example.edu"
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

# Generate 10,000 users
generate_university_csv("students.csv", 10000)