# BrainBurst.io

This project is a ReactJS-based quiz application.

## Website Link

The live version of the quiz application can be accessed at [BrainBurst.io](https://quiz-app-one-ashen.vercel.app/).

## Table of Contents

1. [Introduction](#introduction)
2. [Requirements](#requirements)
3. [Tech Stack](#tech-stack)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Quiz Layout & Flow](#quiz-layout--flow)
7. [Navigation](#navigation)
8. [End of Quiz](#end-of-quiz)
9. [Data Source](#data-source)

## Introduction

This application is a quiz platform where users can participate in a quiz consisting of 15 questions. The questions are fetched from the Open Trivia Database using the provided API. The quiz has a timer of 30 minutes, and the application auto-submits when the timer reaches zero.

## Requirements

### 1. Quiz Layout & Flow

- The application has a start page where the user must submit their email address.
- It displays 15 questions to the user.
- A timer is displayed at the top of the page, counting down from 30 minutes. The quiz auto-submits when the timer reaches zero.

### 2. Navigation

- Users can navigate to a specific question.
- An overview panel or similar element shows all questions indicating which questions the user has visited and attempted.

### 3. End of Quiz

- After the quiz or when the timer ends, users are directed to a report page.
- The report displays each question with the user's answer and the correct answer side by side or in a format that is easy to compare.

### 4. Data Source

- The quiz questions are fetched from the [Open Trivia Database API](https://opentdb.com/api.php?amount=15).
- The questions are displayed using the `question` parameter from the API.
- Choices for each question are a concatenated array of `correct_answer` and `incorrect_answers` parameters.
- The correct answer for every question is provided in the `correct_answer` parameter.

## Tech Stack

The application is built using the following tech stack:

- ReactJS

## Installation

1. Clone the repository:

```bash
git clone <repository_url>
cd fullstack-quiz-application
```

2. Install dependencies:

```bash
npm install
```

## Usage

To start the development server and run the application:

```bash
npm start
```

## Quiz Layout & Flow

- The quiz starts with a start page where users submit their email address.
- Once submitted, 15 questions are displayed to the user.
- A timer counts down from 30 minutes, and the quiz auto-submits when the timer reaches zero.

## Navigation

- Users can navigate to a specific question using the navigation interface.
- An overview panel shows all questions, indicating which ones the user has visited and attempted.

## End of Quiz

- After completing the quiz or when the timer ends, users are redirected to a report page.
- The report displays each question with the user's answer and the correct answer side by side.

## Data Source

- Quiz questions are fetched from the [Open Trivia Database API](https://opentdb.com/api.php?amount=15).
- The `question` parameter from the API is used to display the questions.
- Choices for each question are concatenated from the `correct_answer` and `incorrect_answers` parameters.
- The correct answer for every question is retrieved from the `correct_answer` parameter.

---

Feel free to customize and enhance this README according to your specific project structure and requirements.
