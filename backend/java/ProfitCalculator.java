public class ProfitCalculator {
  public static void main(String[] args) {
    if (args.length < 6) {
      System.out.println("{\"error\":\"Invalid arguments\"}");
      return;
    }

    try {
      double distance = Double.parseDouble(args[0]);
      double weight = Double.parseDouble(args[1]);
      String priority = args[2];
      double fuelPricePerKm = Double.parseDouble(args[3]);
      double driverRatePerKm = Double.parseDouble(args[4]);
      double tollCost = Double.parseDouble(args[5]);

      // Business logic
      double fuelCost = distance * fuelPricePerKm * (1 + 0.001 * weight);
      double laborCost = distance * driverRatePerKm;
      double totalCost = fuelCost + laborCost + tollCost;

      double priorityFactor = "express".equalsIgnoreCase(priority) ? 1.5 : 1.2;
      double recommendedPrice = totalCost * priorityFactor;
      double netProfit = recommendedPrice - totalCost;

      // Output JSON
      System.out.printf(
        "{\"fuelCost\":%.2f,\"laborCost\":%.2f,\"tollCost\":%.2f,\"totalCost\":%.2f,\"recommendedPrice\":%.2f,\"netProfit\":%.2f}%n",
        fuelCost, laborCost, tollCost, totalCost, recommendedPrice, netProfit
      );

    } catch (NumberFormatException e) {
      System.out.println("{\"error\":\"Invalid input data\"}");
    }
  }
}
