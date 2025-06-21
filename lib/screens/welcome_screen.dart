import 'package:flutter/material.dart';
import 'optimizer_screen.dart';

class WelcomeScreen extends StatelessWidget {
  final List<Map<String, String>> countries = [
    {'code': 'FR', 'name': 'France', 'flag': '🇫🇷'},
    {'code': 'US', 'name': 'USA', 'flag': '🇺🇸'},
    {'code': 'DE', 'name': 'Germany', 'flag': '🇩🇪'},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Welcome')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          const Text("🌍 Choose your country:", style: TextStyle(fontSize: 18)),
          const SizedBox(height: 16),
          ...countries.map((country) => Card(
            child: ListTile(
              leading: Text(country['flag']!, style: const TextStyle(fontSize: 24)),
              title: Text(country['name']!),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) => OptimizerScreen(selectedCountry: country['code']!),
                  ),
                );
              },
            ),
          )),
        ],
      ),
    );
  }
}