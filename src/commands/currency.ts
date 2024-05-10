import {
  ActionRowBuilder,
  ChatInputCommandInteraction,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js"
import validateCurrencyCode from "validate-currency-code"
const converter = require("currency-exchanger-js")

const COMMAND_NAME = "currency"

const isNumeric = (n: any) => !isNaN(parseFloat(n)) && isFinite(n)

export const data = new SlashCommandBuilder()
  .setName(COMMAND_NAME)
  .setDescription("Converts the amount in one currency to another.")

export const execute = async (interaction: ChatInputCommandInteraction) => {
  // create a Modal
  const modal: ModalBuilder = new ModalBuilder()
    .setCustomId("currencyConverterModal")
    .setTitle("Currency Converter")

  // Create the amount input component
  const amountInput: TextInputBuilder = new TextInputBuilder()
    .setCustomId("amount")
    .setLabel("Amount")
    .setStyle(TextInputStyle.Short)

  // Create the currrencyFrom input component
  const currencyFromInput: TextInputBuilder = new TextInputBuilder()
    .setCustomId("currencyFrom")
    .setLabel("Currency you wish to convert from")
    .setStyle(TextInputStyle.Short)
    .setMaxLength(3)
    .setMinLength(3)

  // Create the currencyTo input component
  const currencyToInput: TextInputBuilder = new TextInputBuilder()
    .setCustomId("currencyTo")
    .setLabel("Currency you wish to convert to")
    .setStyle(TextInputStyle.Short)
    .setMaxLength(3)
    .setMinLength(3)

  // Add the input components to ActionRow
  const firstActionRow =
    new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
      amountInput
    )
  const secondActionRow =
    new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
      currencyFromInput
    )
  const thirdActionRow =
    new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
      currencyToInput
    )

  // Add ActionRow to the modal
  modal.addComponents(firstActionRow, secondActionRow, thirdActionRow)

  // Show the modal to users
  await interaction.showModal(modal)
  const filter = (interaction: { customId: string }) =>
    interaction.customId === "currencyConverterModal"

  // Show the modal to the user
  const response = await interaction.awaitModalSubmit({ filter, time: 200_000 })
  const currencyFrom = response.fields
    .getTextInputValue("currencyFrom")
    .toUpperCase()
  const currencyTo = response.fields
    .getTextInputValue("currencyTo")
    .toUpperCase()
  const amtInDollars = response.fields.getTextInputValue("amount")

  let error = ""
  const fromCheck = validateCurrencyCode(currencyFrom)
  const toCheck = validateCurrencyCode(currencyTo)
  if (!fromCheck || !toCheck) {
    error = "Invalid Currency Code."
  }
  let amtNumericCheck = isNumeric(amtInDollars)
  if (!amtNumericCheck) {
    error = "Amount is not valid."
  }
  let amount = 0
  if (amtNumericCheck) {
    // convert amt to number and
    // check if positive anot
    // if not positive, set flag
    amount = Number(amtInDollars)
    if (amount < 0) {
      error = "Amount is not positive."
    }
  }

  if (error !== "") {
    response.reply({ content: error })
  } else {
    const conversionAmt = await converter.convert(
      amount,
      currencyFrom,
      currencyTo
    )
    response.reply({
      content: `$${amount} in ${currencyFrom} is $${String(conversionAmt.toFixed(2))} in ${currencyTo}`,
    })
  }
}
