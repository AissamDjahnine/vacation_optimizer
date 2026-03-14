import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:vacation_optimizer/main.dart';
import 'package:vacation_optimizer/app_language.dart';
import 'package:vacation_optimizer/app_routes.dart';

void main() {
  setUp(() {
    appLanguageNotifier.value = AppLanguage.fr;
  });

  testWidgets('affiche le simulateur et les resultats de ponts', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const VacationOptimizerApp());

    expect(find.text('Ponts Malins'), findsAtLeastNWidgets(1));
    expect(find.text('Simulateur'), findsAtLeastNWidgets(1));
    expect(find.text('Guides'), findsAtLeastNWidgets(1));
    expect(find.text('Vacances scolaires'), findsAtLeastNWidgets(1));
    expect(find.text('RTT mensuel'), findsOneWidget);
    expect(find.text('Exemples prêts à tester'), findsOneWidget);
    expect(find.text('5 jours en mai 2026'), findsOneWidget);
    expect(find.text('Famille, zone B'), findsOneWidget);
    expect(find.text('Ponts recommandés'), findsAtLeastNWidgets(1));
    expect(find.text('Mois suivant'), findsAtLeastNWidgets(1));
    expect(find.text('Guides utiles'), findsOneWidget);
  });

  testWidgets('le switch de langue fonctionne sur la page principale', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const VacationOptimizerApp());

    expect(find.text('Simulateur'), findsAtLeastNWidgets(1));

    await tester.tap(find.text('EN').first);
    await tester.pumpAndSettle();

    expect(find.text('Planner'), findsAtLeastNWidgets(1));
    expect(find.text('Recommended bridges'), findsAtLeastNWidgets(1));
  });

  testWidgets('les anciennes routes contenu restent accessibles', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const VacationOptimizerApp());

    final navigator = tester.state<NavigatorState>(find.byType(Navigator));
    navigator.pushNamed(AppRoutePath.contentPath(ContentPageType.bridges, 2026));
    await tester.pumpAndSettle();

    expect(find.text('Ponts 2026 en France'), findsAtLeastNWidgets(1));
    expect(find.text('Utiliser le simulateur'), findsOneWidget);
  });

  testWidgets('la route contenu Ponts fonctionne aussi en anglais', (
    WidgetTester tester,
  ) async {
    appLanguageNotifier.value = AppLanguage.en;
    await tester.pumpWidget(const VacationOptimizerApp());
    await tester.pumpAndSettle();

    final navigator = tester.state<NavigatorState>(find.byType(Navigator));
    navigator.pushNamed(AppRoutePath.contentPath(ContentPageType.bridges, 2026));
    await tester.pumpAndSettle();

    expect(find.text('Bridge ideas in France for 2026'), findsAtLeastNWidgets(1));
    expect(find.text('Use the planner'), findsOneWidget);
  });

  testWidgets('le switch de langue fonctionne aussi sur une page contenu', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const VacationOptimizerApp());

    final navigator = tester.state<NavigatorState>(find.byType(Navigator));
    navigator.pushNamed(AppRoutePath.contentPath(ContentPageType.bridges, 2026));
    await tester.pumpAndSettle();

    expect(find.text('Ponts 2026 en France'), findsAtLeastNWidgets(1));

    await tester.tap(find.text('EN').last);
    await tester.pumpAndSettle();

    expect(find.text('Bridge ideas in France for 2026'), findsAtLeastNWidgets(1));

    await tester.tap(find.text('FR').last);
    await tester.pumpAndSettle();

    expect(find.text('Ponts 2026 en France'), findsAtLeastNWidgets(1));
  });

  testWidgets('navigue vers le guide conges 2026 depuis la home', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const VacationOptimizerApp());

    await tester.ensureVisible(find.text('Comment bien poser ses congés en 2026'));
    await tester.tap(find.text('Comment bien poser ses congés en 2026'));
    await tester.pumpAndSettle();

    expect(
      find.text('Comment bien poser ses congés en 2026'),
      findsAtLeastNWidgets(1),
    );
    expect(find.text('Utiliser le simulateur 2026'), findsOneWidget);
  });

  testWidgets('navigue vers la page vacances scolaires 2026 avec toggle de zone', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const VacationOptimizerApp());

    await tester.ensureVisible(find.text('Vacances scolaires 2026 et ponts'));
    await tester.tap(find.text('Vacances scolaires 2026 et ponts'));
    await tester.pumpAndSettle();

    expect(find.text('Calendrier des vacances scolaires 2025-2026 par zone'), findsOneWidget);
    expect(find.text('Zone A'), findsAtLeastNWidgets(1));
    expect(find.text('Zone B'), findsAtLeastNWidgets(1));
    expect(find.text('Zone C'), findsAtLeastNWidgets(1));
  });

  testWidgets('navigue vers la page jours feries 2027', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const VacationOptimizerApp());

    await tester.ensureVisible(find.text('Jours fériés 2027 et ponts'));
    await tester.tap(find.text('Jours fériés 2027 et ponts'));
    await tester.pumpAndSettle();

    expect(
      find.text('Jours fériés 2027 en France et meilleurs ponts à prévoir'),
      findsAtLeastNWidgets(1),
    );
    expect(find.text('Préparer 2027 dans le simulateur'), findsOneWidget);
  });

  testWidgets('navigue vers la FAQ ponts et jours feries', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const VacationOptimizerApp());

    await tester.ensureVisible(find.text('FAQ ponts et jours fériés'));
    await tester.tap(find.text('FAQ ponts et jours fériés'));
    await tester.pumpAndSettle();

    expect(find.text('FAQ – Ponts, jours fériés et congés'), findsAtLeastNWidgets(1));
    expect(find.text('Calculer mes ponts avec le simulateur'), findsOneWidget);
  });

  testWidgets('le switch de langue fonctionne sur un guide', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const VacationOptimizerApp());

    await tester.ensureVisible(find.text('Comment bien poser ses congés en 2026'));
    await tester.tap(find.text('Comment bien poser ses congés en 2026'));
    await tester.pumpAndSettle();

    await tester.tap(find.text('EN').last);
    await tester.pumpAndSettle();

    expect(find.text('How to plan your leave well in 2026'), findsAtLeastNWidgets(1));
    expect(find.text('Use the 2026 planner'), findsOneWidget);
  });
}
