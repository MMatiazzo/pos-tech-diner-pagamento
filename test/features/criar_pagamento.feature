Feature: Criar Pagamento

  Scenario: Criar Pagamento
    Given A module to create a new payment
    When Call to criarPagamentoController
    Then The response should be a new payment
