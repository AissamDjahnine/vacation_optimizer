import 'package:flutter/material.dart';
import 'screens/welcome_screen.dart';

void main() {
  runApp(const VacationOptimizerApp());
}

class VacationOptimizerApp extends StatelessWidget {
  const VacationOptimizerApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Vacation Optimizer',
      theme: ThemeData(primarySwatch: Colors.teal),
      home: WelcomeScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}